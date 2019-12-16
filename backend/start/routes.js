'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.on('/api/').render('welcome');

Route.post('/api/upload/', async ({ request }) => {
  try{
    const backgroundPic = request.file('background', {
      types: ['image'],
      size: '24mb'
    })

    await backgroundPic.move(Helpers.publicPath('uploads'), {
      name: 'CustomBackground.jpg',
      overwrite: true
    })

    if (!backgroundPic.moved()) {
      return backgroundPic.error()
    }
    return 'File moved'
  }catch(e){
    console.log(e)
  }
});



