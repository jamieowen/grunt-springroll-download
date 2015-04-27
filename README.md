# grunt-springroll-download [![Build Status](https://travis-ci.org/SpringRoll/grunt-springroll-download.svg)](https://travis-ci.org/SpringRoll/grunt-springroll-download) [![Dependency Status](https://david-dm.org/SpringRoll/grunt-springroll-download.svg)](https://david-dm.org/SpringRoll/grunt-springroll-download)

> Download and extract games from SpringRoll Connect.

## Getting Started

This plugin requires Grunt ~0.4.0

If you haven't used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install --save grunt-springroll-download
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-springroll-download');
```
## SpringRoll task

### Options

#### options.server

Type: `String`

Required as the end-point location for the SpringRoll Connect server. This URL must include the protocol ("http" or "https").

#### options.dest

Type: `String`

The path to the output directory for the games. Games are automatically saved as in a folder matching the slug of the game. 

#### options.status

Type: `String`
Default: `prod`

The global status to use for pulling games. This can either be `prod`, `dev`, `stage` or `qa`. For non-`prod` release status, a `token` option is required. 

#### options.token

Type: `String`

A unique access token used for SpringRoll Connect to download non-public releases.

#### options.debug

Type: `Boolean`
Default: `false`

The downloaded archive will be the debug build of the game. The default downloads the release archive.

### Game Settings

Each task contains a list of games. The game can be a `String` (the `slug`) or an `Object` with the following properties:

#### game.slug

Type: `String`
Default: `undefined`

The SpringRoll Connect game slug. 

#### game.status

Type: `String`
Default: `prod`

The game status to use for pulling release. See the option `status` for more information.

#### game.version

Type: `String`
Default: `undefined`

The specific version of a game to download. Versions should be in the Semantic Version schema (e.g. "1.0.0"). A `token` option is required to download a specific version.

#### game.commit

Type: `String`
Default: `undefined`

The specific Git commit hash of a game to download. A `token` option is required to download a specific commit.

## Usage

### Basic Usage

This configuration will download the latest production releases of each of the games to the output folder using the default options. 

```js
grunt.initConfig({
	springroll: {
		options: {
			server: 'http://springroll-connect.example.com',
			dest: 'deploy/games'
		},
		// list of games
		all: [
			'air-show',
			'pinecone-pass'
		]
	}
});
```

### Game Settings

This configuration will download version `1.0.0` of `air-show` and the latest development release of `pinecone-pass`.

```js
grunt.initConfig({
	springroll: {
		options: {
			server: 'http://springroll-connect.example.com',
			token: 'asdfasdfasdfasdfasdfadsfasdfasdf',
			dest: 'deploy/games'
		},
		all: [
			{
				slug: 'air-show',
				version: '1.0.0'
			},
			{
				slug: 'pinecone-pass',
				status: 'dev'
			}
		]
	}
});
```

### Dev and Release Version

This configuration will create two subtasks to download either the latest QA releases of the games, or the latest production versions of the games.

```js
grunt.initConfig({
	springroll: {
		options: {
			server: 'http://springroll-connect.example.com',
			token: 'asdfasdfasdfasdfasdfadsfasdfasdf',
			dest: 'deploy/games'
		},
		debug: {
			options: {
				status: 'qa'
			},
			games: [
				'air-show',
				'pinecone-pass'
			]
		},
		release: {
			options: {
				status: 'prod'
			},
			games: '<%= springroll.debug.games %>'
		}
	}
});
```
