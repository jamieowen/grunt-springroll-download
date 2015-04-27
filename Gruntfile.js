module.exports = function(grunt)
{
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/**/*.js'
			]
		},
		springroll: {
			options: {
				server: 'http://springroll-dev.pbskids.org',
				status: 'prod',
				dest: 'tmp'
			},
			all: ['air-show']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	require('./tasks/springroll.js')(grunt);
	
	grunt.registerTask('games', ['springroll']);
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('test', ['jshint']);
};
