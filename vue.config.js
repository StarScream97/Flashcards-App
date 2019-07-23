module.exports = {
    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: new RegExp('^https://flashcards-server-app.herokuapp.com/'),
            handler: 'networkFirst',
            options: {
              networkTimeoutSeconds: 20,
              cacheName: 'api-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: new RegExp('^http://fontawesome.com/'),
            handler: 'networkFirst',
            options: {
              networkTimeoutSeconds: 20,
              cacheName: 'icons-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: new RegExp('^http://fonts.google.com/'),
            handler: 'networkFirst',
            options: {
              networkTimeoutSeconds: 20,
              cacheName: 'fonts-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }
  };