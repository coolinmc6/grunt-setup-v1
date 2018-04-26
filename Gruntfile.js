module.exports = function(grunt) {

	grunt.initConfig({
		sass: {                              // Task 
		    build: {                            // Target 
		      files: {                         // Dictionary of files 
		        'src/css/styles.css': 'src/css/styles.scss'       // 'destination': 'source' 
		      }
		    }
		},
		cssmin: {
			target: {
				src: ['src/css/styles.css'],
				dest: 'build/css/styles.min.css',
			}
		},
		babel: {
			options: {
	            sourceMap: true,
	            presets: ['env']	// need both env AND babili to minify it
	        },
	        dist: {
	            files: {
	                'src/js/main-babeled.js': 'src/js/main.js'
	            }
	        }
		},
		uglify: {
			options: {
				mangle: true
			},
			build: {
				files: {
					'build/js/main.min.js': ['src/js/main-babeled.js']
				}
			}
		},
		watch: {
			css: {
				files: 'src/css/*.scss',
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: 'src/js/main.js',
				tasks: ['babel', 'uglify']
			}
		}

	});
	
	// npm i -g grunt-cli (if it's not already installed)
	// npm i grunt load-grunt-tasks grunt-contrib-watch grunt-contrib-sass grunt-contrib-cssmin grunt-babel babel-core babel-preset-env babel-preset-babili --save-dev
	
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify-es'); ==> NO LONGER NEEDED; replaced by babili
	// grunt.loadNpmTasks('grunt-babel');
	require('load-grunt-tasks')(grunt);

	grunt.registerTask("default", ["sass", "cssmin", "babel"]);

	// This allows me to not have to individually load grunt tasks
	// https://www.npmjs.com/package/load-grunt-tasks
	// require('load-grunt-tasks')(grunt);
}