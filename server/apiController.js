const axios = require('axios');
const fs = require('fs');

const apiController = {};

apiController.requestList = (req, res, next) => {
  // console.log('apikey:', process.env.YELP_API_KEY);
  // console.log(req.body);

  let searchStr = req.body.searchStr.replace(/[^a-zA-Z0-9' ]/g,'');
  const config = {
    params: {
      term: searchStr,
    },
    headers: { 'Authorization': 'Bearer ' + process.env.YELP_API_KEY },
  }

  if (req.body.searchLoc) {
    let searchLoc = req.body.searchLoc.replace(/[^a-zA-Z0-9, ]/g,'').replace(/ /g, '%20');
    config.params.location = searchLoc;
    res.cookie('loc', req.body.searchLoc);
  } else {
    config.params.latitude = req.body.latitude;
    config.params.longitude = req.body.longitude;
  }

  const url = 'https://api.yelp.com/v3/businesses/search';

  

  // axios.get(url, config)
  // .then((resp)=>{
  //   // console.log(resp.data);
  //   // fs.writeFileSync('tempdata2.json', JSON.stringify(resp.data));
  //   res.locals.data = resp.data;
  //   next();
  // })
  // .catch(console.error)

  fs.readFile('tempdata2.json', (err, data) => {
    if (err) next(err);
    res.locals.data = JSON.parse(data);
    next();
  });
}


module.exports = apiController;