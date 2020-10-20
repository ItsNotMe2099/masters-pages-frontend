var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require("axios");
var router = express.Router();
var config=require('./config.json');
var request = require('request');
var progress = require('request-progress');
var moment=require('moment');
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
var url = require('url');
const fs = require('fs');
var app = express();
var session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( express.static('/mnt/nfs/insberra/'));
app.use(session({
  secret: '5643tvfeebnetnbne',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var bodyParser = require('body-parser');
//app.use(bodyParser.json());
app.use(bodyParser.raw({inflate: true,
  limit: '100kb',
  type: '*/*'}));

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server=app.listen(8090, ()=>{
  console.log("server ready, port 8090")
});

router.post("/link",(req, resp)=>{
  console.log(".link ");
  const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  mongoClient.connect(function(err) {
    const db = mongoClient.db("mediateka");
    db.collection('tmpLink').insertOne(req.body,(err, result)=>{
      resp.json(result.insertedId)
    })
  });
})
router.get("/link/:id",(req, res)=>{

  var id;
  try{
    id=require('mongodb').ObjectId(req.params.id);
  }
  catch(e){
    return res.status(404).send("not found");
  }
  mongoClient.connect(function(err) {
    const db = mongoClient.db("mediateka");
    db.collection('tmpLink')
      .find({"_id": id})
      .toArray((err, docs)=>{
        if(err)
          return res.status(500).send(err);
        if(docs.length==0)
          return res.status(404).send("not found");
        var data=moment(docs[0].data, "DD.MM.YYYY").startOf("day").unix();
        var now=moment().startOf("day").unix()
        if(data<now)
          return res.status(404).send("not found, expiried");
        else
        {
          //  res.redirect(307, docs[0].link);
          var target=docs[0].link;
          require("https").get(target, resp => {
            if(resp.statusCode == 302)
              target = resp.headers.location;
            req.pipe(request.get(target)).pipe(res);
          });

          /*  var http = require('request')
            http(docs[0].link,(err,resp, body)=>{
              console.log(resp);
              res.send(body);
              });
  */
        }

      });
  });
});
router.post("/videos", (req, res)=>{
  console.log("/videos", new Date());
  var refferer=req.get('Referer');

  var headerHash=req.get("Request-Hash")

  if(headerHash=="undefined" || headerHash==null)
  {
    return res.send(401);
  }

  const crypto = require('crypto');


  const hash = crypto.createHmac('sha256', config.requestHashSecret)
    .update(req.body)
    .digest('hex');

  var dtJson=(req.body.toString());
//console.log(req.body);
  var dt=  JSON.parse(dtJson);
  fs.appendFileSync(config.log,"\r\n headerHash: "+ headerHash);
  fs.appendFileSync(config.log,"\r\n calculatedHash: "+ hash);

  fs.appendFileSync(config.log,"\r\n"+ dtJson);

  if(
    dt.fileName==null ||
    dt.fileSize==null ||
    dt.mimeType==null ||
    dt.linkToUpload==null
  )
    return res.status(422).json({InSberraID:dt.InSberraID, errorDescr:"missing params"});

  ///file start upload

  console.log("file start upload");
  var dir = '/mnt/nfs/insberra/';//+moment().startOf('day').unix();
  var videoId={dir:moment().startOf('day').unix(), file:moment().unix(), ext:(require('path')).extname(dt.fileName)}
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  dir+=videoId.dir;

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  var filename=dir+"/"+videoId.file+videoId.ext;

  res.json({InSberraID:dt.InSberraID, errorDescr:null});

  var random=Math.random()*10000000000000+"";
  var g=require('crypto');
  var randomHash = g.createHmac('sha256', config.requestHashSecret)
    .update(random)
    .digest('hex');
  const callBackHeaders = {'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*.rs0",
    "Request-String":random,
    "Request-Hash":randomHash
  }
  var ii=false;
  progress(request(dt.linkToUpload),{})
    .on('progress', state=>{
      console.log("UPLOAD PROGRESS",state.size.transferred, parseInt((state.size.transferred/dt.fileSize)*100))
    })
    .on('error', function (err) {
      console.log("UPLOAD ERROR", err);
      var data={
        InSberraID:dt.InSberraID,
        mediaID:null,
        linkToPackage:null,
        statusCode:500,
        errorDescr:err,
        dateTimeCompleted:moment().toISOString()
      };
//    axios.post('https://insberra.sberbank-school.ru/api/v1/video_done', data, {headers: callBackHeaders})
      console.log("video_done 1 ", refferer+'/api/v1/video_done');
      axios.post(refferer+'/api/v1/video_done', data, {headers: callBackHeaders})
        .then(console.log("responce send"));
    })
    .on('end', function () {
//    console.log("UPLOAD COMPLITED", filename, getFilesizeInBytes(filename), dt.fileSize)
      // if(getFilesizeInBytes(filename)!=dt.fileSize)
      if(ii==false)
      {
        ii=true;
        if(false)
        {
          //ii=true;

          console.log("files sizes not match");
          var data={
            InSberraID:dt.InSberraID,
            mediaID:null,
            linkToPackage:null,
            statusCode:500,
            errorDescr:err,
            dateTimeCompleted:moment().toISOString()
          };
          console.log("video_done 2 ", refferer+'/api/v1/video_done');
          axios.post(refferer+'/api/v1/video_done', data, {headers: callBackHeaders})
            .then(()=>console.log("responce send"));
          return;
        }
        else {

          var data={
            InSberraID:dt.InSberraID,
            mediaID:videoId.dir+"/"+videoId.file,
            linkToPackage:'https://media.sberbank-school.ru/api/v1/videoPackage/'+dt.InSberraID+"/"+videoId.dir+"/"+videoId.file,
            statusCode:200,
            errorDescr:null,
            dateTimeCompleted:moment().toISOString()
          };
          // axios.post('https://insberra.sberbank-school.ru/api/v1/video_done', data, {headers: callBackHeaders})
          console.log("video_done 3 ", refferer+'/api/v1/video_done');
          axios.post(refferer+'/api/v1/video_done', data, {headers: callBackHeaders})
            .then(()=>{
              console.log("responce send", JSON.stringify(data))
              mongoClient.connect(function(err) {
                const db = mongoClient.db("mediateka");
                data.refferer=refferer;
                data.file=filename;
                data.files=[{type:'source', file:filename}]
                console.log("before insert ", data.files)
                db.collection('insberra').insertOne(data , async (err, result)=>{
                  console.log("before post ", filename)
                  var itemId=await addVideoToDS(dt.categoryTitie, dt.videoTitle);
                  var result=await insertVideoToCollection(filename, itemId);
                  axios.post(config.encoderUrl+'/startEncode',{file:filename, itemId:itemId}, {headers: {'Content-Type': 'application/json'}})
                    .then(async ()=>{
                      console.log("after insert ", config.encoderUrl+'/startEncode')
                    })
                    .catch((e)=>{console.log("encoder not started")})
                })
//        });
              })

            })
            .catch((err)=>{console.log('responce err '+err , JSON.stringify(data) )});
          return;
        }
      }
    })
    .pipe(fs.createWriteStream(filename));

})

router.get("/videoPackage/:InSberraId/:folder/:file/",async (req, res)=>{
  return videoPackageAuth(req, res);
  var requestString=req.get("Request-String")
  var headerHash=req.get("Request-Hash")

  if(headerHash=="undefined" || headerHash==null || requestString=="undefined" || requestString==null)
  {
    return res.status(403).json({
      InSberrdeoPackageaID:req.params.InSberraId,
      mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
      authCode:403, // статус авторизации 200 или 403
      authErrorDescr:"not headers",// в случае ошибки авторизации описание ошибки
      linksToVideo:[]
    })
  }

  const crypto = require('crypto');
  const hash = crypto.createHmac('sha256', config.requestHashSecret)
    .update(requestString)
    .digest('hex');

  if( hash!=headerHash){

    return res.status(403).json({
      InSberraID:req.params.InSberraId,
      mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
      authCode:403, // статус авторизации 200 или 403
      authErrorDescr:"not auth",// в случае ошибки авторизации описание ошибки
      linksToVideo:[]
    })

  }

  videoPackageAuth(req, res);
  return;


  if(!(req.cookies.apiSess && checkCoockie(req.cookies.apiSess))){
    var queryData = url.parse(req.url, true);
    if(!(queryData.query && queryData.query.code)){
      res.cookie('apiredirect',req.params.InSberraId+"V"+req.params.folder+"V"+req.params.file, { maxAge: 100000, httpOnly: true });
      return res.redirect('https://api.sberbank-school.ru/v2/oauth/authorize/?client_id=67&redirect_uri=https://media.sberbank-school.ru/jspui/&response_type=code');
    }
    else{
      res.cookie('apiredirect', {maxAge: Date.now()});
      var params={
        grant_type:"authorization_code",
        client_id:67,
        client_secret:"IEnED1JEm8D3jvt8xRdL83P63zESbJSb8rFtPIsy",
        code:queryData.query.code,
        redirect_uri:"https://media.sberbank-school.ru/jspui/",

      }
      var checkUrl="https://api.sberbank-school.ru/v2/oauth/token/"
      var request="client_id=67&redirect_uri=https://media.sberbank-school.ru/jspui/&grant_type=authorization_code&code="+queryData.query.code+"&client_secret=IEnED1JEm8D3jvt8xRdL83P63zESbJSb8rFtPIsy&";

      try{
        var data= await axios.post(checkUrl,request,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        res.cookie('apiredirect', {maxAge: Date.now()});
        const crypto = require('crypto');
        var rand=new String(parseInt(Math.random()*1000000));
        const hash = crypto.createHmac('sha256', config.requestHashSecret).update(rand+"_")
          .digest('hex');

        res.cookie('apiSess',JSON.stringify({id:rand, val:hash}),  { maxAge: 100000, httpOnly: true });
        res.redirect("/api/v1/videoPackage/"+req.params.InSberraId+"/"+req.params.folder+"/"+req.params.file)
        //videoPackageAuth(req, res);
      }
      catch(e)
      {
        console.warn(e)
        res.status(403).json({
          InSberraID:req.params.InSberraId,
          mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
          authCode:403, // статус авторизации 200 или 403
          authErrorDescr:"not auth",// в случае ошибки авторизации описание ошибки
          linksToVideo:[]
        })
      }
    }
  }
  else
  {
    videoPackageAuth(req, res);
  }


})
function checkCoockie(cookie){
  try{
    return true;
    var parsed=JSON.parse(cookie);
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', config.requestHashSecret).update(parsed.id+"_")
      .digest('hex');
    return hash==parsed.val;
  }
  catch(e){
    console.warn(e)
  }
  return false;

}
function videoPackageAuth(req, res){


// res.json({i:req.params.InSberraId, folder:req.params.folder, file:req.params.file});
  var dir = '/mnt/nfs/insberra/';
  fs.readdir(dir+req.params.folder, function (err, files) {
    if (err) {
      return res.status(422).json({
        InSberraID:req.params.InSberraId,
        mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
        authCode:403, // статус авторизации 200 или 403
        authErrorDescr:"mediaId not found",// в случае ошибки авторизации описание ошибки
        linksToVideo:[]
      })
    }
    var dir = '/mnt/nfs/insberra/'
    var file=null;
    files.forEach(function (fl) {
      if(fl.indexOf(req.params.file+".")>=0)
        file=fl;
    });
    if(file==null){
      return res.status(422).json({
        InSberraID:req.params.InSberraId,
        mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
        authCode:403, // статус авторизации 200 или 403
        authErrorDescr:"fileId not found",// в случае ошибки авторизации описание ошибки
        linksToVideo:[]
      })
    }
    else{
      var url="/videoPackage/"+req.params.InSberraId+"/"+req.params.folder+"/"+req.params.file;

      var linksToVideo=[
        {
          fileId:req.params.file,
          fileSize:getFilesizeInBytes(dir+req.params.folder+"/"+file),
          fileMimeType:require('mime-types').lookup(file),//&gt;// mime-type файла
          fileFormatDescription:"original",//описание формата файла
          fileFormatBitrate:-1,//битрейт формата файла
          fileFormatSize:"1920:1080",//разрешение видеофайла “1920:1080”.
          fileLink:"https://media.sberbank-school.ru/insberrafile/"+req.params.folder+"/"+file//ссылка на файл
        }];
      console.log("readdir", dir+req.params.folder+"/"+req.params.file)
      if(fs.existsSync(dir+req.params.folder+"/"+req.params.file))
      {
        console.log("check for converted", dir+req.params.folder+"/"+req.params.file)
        fs.readdir(dir+req.params.folder+"/"+req.params.file, (err, convertedFiles)=>{
          console.log("converted find", convertedFiles, linksToVideo)
          convertedFiles.forEach(cv=>{
            if(cv.indexOf("tmp")<0)
              linksToVideo.push({
                fileId:req.params.file,
                fileMimeType:require('mime-types').lookup(dir+req.params.folder+"/"+req.params.file+"/"+cv),
                fileSize:getFilesizeInBytes(dir+req.params.folder+"/"+req.params.file+"/"+cv),
                fileFormatDescription:"converted",
                fileFormatBitrate:cv.replace(".mp4", "")+"k",
                fileFormatSize:"1920:1080",

                fileLink:"https://media.sberbank-school.ru/insberrafile/"+req.params.folder+"/"+req.params.file+"/"+cv
              })
            console.log("after insert", linksToVideo.length);
          })
          retFunc({
            InSberraID:req.params.InSberraId,
            mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
            authCode:200, // статус авторизации 200 или 403
            authErrorDescr:"",//"not converted files",// в случае ошибки авторизации описание ошибки
            linksToVideo:linksToVideo
          });
        });
      }
      else
        retFunc({
          InSberraID:req.params.InSberraId,
          mediaID:req.params.folder+"/"+req.params.file, // уникальный идентификатор Медиатеки
          authCode:200, // статус авторизации 200 или 403
          authErrorDescr:"",//"not converted files",// в случае ошибки авторизации описание ошибки
          linksToVideo:linksToVideo
        });


      function retFunc(r){
        res.status(200).json(r);
      }


    }
  });



  function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
  }
}


router.all("/test", async (req, res) => {
  try {
    var itemId=await addVideoToDS("кат 1", "vid 1");
    var result=await insertVideoToCollection("/mnt/nfs/insberra/1571173200/1571233684.mp4", itemId)

    result=await insertVideoToCollection("/mnt/nfs/insberra/1571173200/1571233684.mp4", itemId)

    return res.json({a:1, b:itemId})
  }
  catch (e) {
    return res.json(e.responce)
  }
})
async function  addVideoToDS(categoryTitle, videoTitle) {
  categoryTitle=categoryTitle || "import from Insberra " + moment().format("DD.MM.YYYY HH:mm");
  videoTitle=videoTitle ||"import from Insberra " + moment().format("DD.MM.YYYY HH:mm")
  //videoTitle=categoryTitle+" | "+videoTitle;
  var querystring = require('querystring');
  var result = await axios.post(config.dspaceApiUrl + "/login",querystring.stringify({email:"d@rustv.ru","password":"Gbplfgbplf13"}), {withCredentials: true, headers: {Accept: "application/json","Content-Type":"application/x-www-form-urlencoded" }})
  var authCokie=result.headers["set-cookie"][0].split(" ")[0];
  //result = await axios.get(config.dspaceApiUrl + "/status", {withCredentials: true,headers: {Accept: "application/json", "Cookie":authCokie}})
  //f020f0b9-a965-4ca8-8018-cfc805892223

  var collections=await axios.get(config.dspaceApiUrl + "/communities/f020f0b9-a965-4ca8-8018-cfc805892223/collections");
  var coll=collections.data.filter(e=>{
    return e.name==categoryTitle});
  var collId='';
  if(coll.length==0){
    var r=await axios.post(config.dspaceApiUrl + "/communities/f020f0b9-a965-4ca8-8018-cfc805892223/collections",
      JSON.stringify ({name:categoryTitle}),
      {withCredentials: true,headers: {Accept: "application/json", "Content-Type":"application/json", "Cookie":authCokie}});
    collId=r.data.uuid;

    var knex = require('knex')({
      client: 'pg',
      version: '7.2',
      connection:{
        "host": "pgsql1",
        "user": "dspace",
        "password": "9PS7etZGjU",
        "database": "dspace"
      }
    });

    console.log("collId",collId)

    var r= await knex("public.resourcepolicy").first("*")
      .where({"dspace_object":collId, "action_id":-1})

    r= await knex("public.resourcepolicy")
      .update({"action_id":9})
      .where({"policy_id":r.policy_id})

    r= await knex("public.resourcepolicy").first("*")
      .where({"dspace_object":collId, "action_id":-1})

    r= await knex("public.resourcepolicy")
      .update({"action_id":10})
      .where({"policy_id":r.policy_id})


  }
  else
  {
    collId=coll[0].uuid;

  }

  var item={"metadata":[
      {
        "key": "dc.contributor.author",
        "value": "inSberra",
        "language": null,

      },
      {
        "key": "dc.contributor.author",
        "value": "inSberra",
        "language": null,

      },
      {
        "key": "dc.date.accessioned",
        "value": new Date(),
        "language": null,

      },
      {
        "key": "dc.date.available",

        "value": new Date(),
        "language": null,

      },
      {
        "key": "dc.date.issued",
        "value": new Date(),
        "language": null,

      },

      {
        "key": "dc.description.provenance",
        "value": "Submitted by API fro inSberra",
        "language": "en",

      },

      {
        "key": "dc.language.iso",
        "value": "ru",
        "language": "ru_RU",

      },
      {
        "key": "dc.subject",
        "value": videoTitle,//categoryTitle||"import from Insberra " + moment().format("DD.MM.YYYY HH:mm"),
        "language": "ru_RU",

      },
      {
        "key": "dc.title",
        "value": videoTitle,// videoTitle || "import from Insberra " + moment().format("DD.MM.YYYY HH:mm"),
        "language": "ru_RU",

      }

    ]}

  try{
    result = await axios.post(config.dspaceApiUrl + "/collections/"+collId+"/items",JSON.stringify (item),{withCredentials: true,headers: {Accept: "application/json", "Content-Type":"application/json", "Cookie":authCokie}})
    return result.data.uuid
  }
  catch(e){
    console.log("error:", e)
  }

}
function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}

async function insertVideoToCollection(fileName, itemId){
  console.log("intemId", itemId)
  var querystring = require('querystring');
  var result = await axios.post(config.dspaceApiUrl + "/login",querystring.stringify({email:"d@rustv.ru","password":"Gbplfgbplf13"}), {withCredentials: true, headers: {Accept: "application/json","Content-Type":"application/x-www-form-urlencoded" }})
  var authCokie=result.headers["set-cookie"][0].split(" ")[0];


  const readmeStream = fs.createReadStream(fileName)
  readmeStream.on('error',(e)=>{ console.log(e)})
  const size = fs.statSync(fileName).size;
  console.log(config.dspaceApiUrl + "/items/"+itemId+"/bitstreams");

  result = axios.post(config.dspaceApiUrl + "/items/"+itemId+"/bitstreams?name="+path.basename(fileName),
    readmeStream,
    {
      withCredentials: true,
      encoding: null,
      'maxContentLength': Infinity,       'maxBodyLength': Infinity,
      headers: {Accept: "application/json", "Content-Type":"video/mp4", "Cookie":authCokie, }
    })
    .then(e=>{return  {err:0,data:result.data }})
    .catch(e=>{console.log("err")})
}
