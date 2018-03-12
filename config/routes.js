/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: '../assets/index.html'
  // }
  'get /api/login': 'loginController.authenticate',
  'get /api/logout': 'loginController.logout',
  'get /api/userinfo': 'generalController.loggedInUserInfo',
  'post /api/signup': 'signupController.addUser',
  'get /api/get/passwords': 'passwordController.getDocuments',
  'get /api/get/password': 'passwordController.getDocument',
  'post /api/post/password': 'passwordController.addDocument',
  'post /api/update/password': 'passwordController.updateDocument',
  'get /api/delete/password': 'passwordController.deleteDocument',
  'get /api/get/alarms': 'alarmController.getDocuments',
  'get /api/get/alarm': 'alarmController.getDocument',
  'post /api/post/alarm': 'alarmController.addDocument',
  'post /api/update/alarm': 'alarmController.updateDocument',
  'get /api/delete/alarm': 'alarmController.deleteDocument',
  'get /api/get/notes': 'notesController.getDocuments',
  'get /api/get/note': 'notesController.getDocument',
  'post /api/post/note': 'notesController.addDocument',
  'post /api/update/note': 'notesController.updateDocument',
  'get /api/delete/note': 'notesController.deleteDocument',
  'post /api/post/file/upload': 'fileController.saveFile',
  'get /file/:fileid': 'fileController.getFile'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
