const webpack = require('webpack')

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      dist: {
        resolve: {
          // issue between webpack and inferno-component
          // https://github.com/infernojs/inferno/issues/851
          mainFields: ["browser", "main", "module"]
        },
        entry: "./app/app.js",
        output: {
            path: "./public/js",
            filename: "<%= pkg.name %>-<%= pkg.version %>.bundle.js",
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
            }
          ]
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/stylesheets',
          src: ['application.scss'],
          dest: 'tmp/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ";\n"
      },
      css: {
        src: [
          'tmp/css/application.css'
        ],
        dest: 'public/css/<%= pkg.name %>-<%= pkg.version %>.bundle.css'
      }
    },
    preprocess : {
      options: {
        context : {
          name : '<%= pkg.name %>',
          version : '<%= pkg.version %>'
        }
      },
      html : {
        src : 'app/index.html',
        dest : 'public/index.html'
      }
    },
    watch: {
      js: {
        files: [
          'app/index.html',
          'app/app.js',
        ],
        tasks: ['webpack'],
        options: {
          interrupt: true,
        },
      },
      css: {
        files: [
          'app/assets/stylesheets/**/*.scss'
        ],
        tasks: ['sass', 'concat'],
        options: {
          interrupt: true,
        },
      }
    },
    clean: ['public']
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks('grunt-preprocess');


  grunt.registerTask('default', ['clean', 'preprocess', 'sass', 'concat', 'webpack']);
};
