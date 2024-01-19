//domain/.netlify/functions/hello-world

//Test netlify serverless function to check folder access.
exports.handler = async function () {
    return {
      statusCode: 200,
      body: 'Hello world!',
    }
  }