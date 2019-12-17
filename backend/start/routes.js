'use strict'
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
    return "https://rtc.ajak.in/uploads/CustomBackground.jpg?t="+ Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) ;
  }catch(e){
    console.log(e)
  }
});



