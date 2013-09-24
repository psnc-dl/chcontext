module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg : grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - ' +
			'Copyright 2013 <%= pkg.author.name %> - ' +
			'Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %> */\n',
		// Task configuration.
		concat: {
			options: {
				process: 'true'
			},
			dist: {
				src: ['src/intro.js', 'src/<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			},
		},
		csslint: {
			src: ['src/*.css']
		},
		image_resize: {
			resize: {				
				options: {
					width: 180
				}, 
				files: [{
					expand: true,
					cwd: 'src/image/original/',
					src: ['*.png'],
					dest: 'src/image/'
				}]
			}
		},
		imagemin: {
			min: {
				options: {
					optimizationLevel: 2
				}, 
				files: [{
					expand: true,
					cwd: 'src/image/',
					src: ['*.png'],
					dest: 'src/image/'
				}]
			}		
		},
		replace: {
			css: {
				src: ['src/style.css'],
				dest: 'dist/',
				replacements: [{
					from: '\n',
					to: '\\\n'					
				}]
			},
			cssmin: {
				src: ['src/<%= pkg.name %>.js'],
				dest: 'tmp/',
				replacements: [{
					from: 'style.css',
					to: 'style.min.css'					
				}]
			},
		},
		cssmin: {
			min: {
				files: {
					'dist/style.min.css': ['src/style.css']
				}
			}
		},
		uglify : {
			options : {
				banner: '<%= banner %>'
			},
			dist : {
				files : {
					'dist/<%= pkg.name %>.min.js' : ['tmp/<%= pkg.name %>.js']
				}
			}
		},
		includereplace: {
			dist: {
				src: 'dist/<%= pkg.name %>*.js',
				dest: ''
			}
		},
		jshint : {
			files : ['src/*.js', 'Gruntfile.js'],
			options : {
				// options here to override JSHint defaults
				globals : {
					jQuery : true,
					console : true,
					module : true,
					document : true
				}
			}
		},
		qunit: {
			all: ['test/*.html']
		}, 
		clean: ['tmp', 'dist/style*.css'],
		base64: {
			prepare_data: {
				files: {
					'tmp/image/fbc.b64': 'src/image/fbc.png',
					'tmp/image/europeana.b64': 'src/image/europeana.png',
					'tmp/image/dpla.b64': 'src/image/dpla.png'
				}
			}
		},
		watch : {
			js: {
				files: '<%= jshint.files %>',
				tasks: ['jshint']
			},
			css: {
				files: '<%= csslint.src %>',
				tasks: ['csslint']
			},
			livereload: {
				files: ['<%= watch.js.files %>', '<%= watch.css.files %>', 'example/*', 'dist/*'],				
				options: {
					// Start a live reload server on the default port 35729
					livereload: true,
				}
			},
			dist: {
				files: ['<%= watch.js.files %>', '<%= watch.css.files %>'],
				tasks: ['dist']
			}, 
			test: {
				files: ['test/tests.html'],
				tasks: ['test']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-base64');
	grunt.loadNpmTasks('grunt-image-resize');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-text-replace');
	
	

	// Default task.
	grunt.registerTask('default', ['jshint', 'csslint']);
	
	grunt.registerTask('test', ['qunit']);
	
	grunt.registerTask('dist', ['concat', 'replace', 'cssmin', 'uglify', 'includereplace', 'clean']);
	
	grunt.registerTask('prepare_logo', ['image_resize', 'imagemin']);
	
}; 