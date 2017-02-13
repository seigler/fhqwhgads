module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			build: {
				cwd: 'src',
				src: [
					'**',
					'!**/*.less',
					'!**/*.css',
					'!**/*.js',
					'!**/*.xcf'
				],
				dest: 'build',
				expand: true
			}
		},

		clean: {
			build: {
				src: [ 'build' ]
			}
		},

		cleanempty: {
			build: {
				options: {
					files: false,
					folders: true
				},
				src: [ 'build/**/*' ]
			}
		},

		uglify: {
			build: {
				options: {
					compress: false,
					beautify: true,
					mangle: false
				},
				files: {
					'build/application.js': [ 'src/**/*.js', '!src/assets/javascript/index.js', 'src/assets/javascript/index.js' ]
				}
			}
		},

		less: {
			build: {
				options: {
					relativeUrls: true
				},
				files: {
					'build/compiled-styles.css': 'src/site.less'
				}
			}
		},

		autoprefixer: {
			build: {
				expand: true,
				src: [ 'build/**/*.css' ]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			stylesheets: {
				files: ['src/**/*.less', 'src/**/*.css'],
				tasks: [ 'stylesheets' ]
			},
			scripts: {
				files: 'src/**/*.js',
				tasks: [ 'scripts' ]
			},
			copy: {
				files: [ 'src/**', '!src/**/*.less', '!src/**/*.css', '!src/**/*.js' ],
				tasks: [ 'copy', 'cleanempty' ]
			}
		},

		connect: {
			server: {
				options: {
					port: 1337,
					base: 'build'
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-cleanempty');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask(
		'default',
		'Default is to build everything, then watch for changes',
		['build', 'connect', 'watch']
	);
	grunt.registerTask(
		'stylesheets',
		'Compiles the stylesheets.',
		[ 'less', 'autoprefixer' ]
	);
	grunt.registerTask(
		'scripts',
		'Compiles the scripts.',
		[ 'uglify' ]
	);
	grunt.registerTask(
		'build',
		'Compiles all of the assets and copies the files to the build directory.',
		[ 'clean', 'copy', 'stylesheets', 'scripts', 'cleanempty' ]
	);
};
