module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [ 'public/client/*.js' ],
        dest: 'public/client/built.js'
      }
    },

    clean: {
      contents: [ 'public/client/built.js', 'public/client/built_min.js' ]
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/client/built_min.js' : [ 'public/client/built.js' ]
        }
      }
    },

    eslint: {
      options: {
          quiet: true
      },

      target: [
        // Add list of files to lint here
        'public/client/app.js',
        'public/client/createLinkView.js',
        'public/client/link.js',
        'public/client/links.js',
        'public/client/linksView.js',
        'public/client/linkView.js',
        'public/client/router.js',
        'app/*.js',
        'server.js',
        'server-config.js'
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      addall: {
        command: 'git add *'
      },

      commitall: {
        command: 'git commit -m "auto commit"'
      },

      pushlive: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'clean',
    'test',
    'eslint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'shell:addall',
    'shell:commitall',
    'shell:pushlive'
  ]);

};
