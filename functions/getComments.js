const axios = require("axios");


// get all blog comment issues
// https://api.github.com/repos/apricot13/femgeek-static/labels/blog-comment



var commentId = 1;
var url = "https://github.com/apricot13/femgeek-static/issues/" + commentId
var api_url = "https://api.github.com/repos/apricot13/femgeek-static/issues/" + commentId + "/comments"

// serverless letlify lambda function, 
// intermediate between client and github apiv4

exports.handler = (event, context, callback) => {
  const URL = `https://api.github.com/graphql`;
  const accessToken = process.env.GITHUB_API_KEY;
  const query = `
  query {
    repositoryOwner(login:"kiranbhalerao123"){
      pinnedRepositories(first:10) {
        nodes {
          name
          url
          homepageUrl
          description
          repositoryTopics(first:10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }`;

  // Send json response to the react client app
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  // Perform API call
  const getrepos = () => {
    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => send(res.data.data.repositoryOwner.pinnedRepositories.nodes))
      .catch(err => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    getrepos();
  }
};