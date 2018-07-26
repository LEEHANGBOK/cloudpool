module.exports = (function(){
  var async = require('async');
  var fs = require('fs');
  var request = require('request');

  var listFileRest = function(user_id, folderId, callback){
    var data = {
      "user_id": user_id,
      "folderID": folderId
    };
    request.post({
      url: 'http://localhost:4000/api/box/check/',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body.list);
    });
  }

  var refreshFileRest = function(user_id, callback){
    var data = {
      "user_id": user_id
    };
    request.post({
      url: 'http://localhost:4000/api/box/refresh/filelist',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body);
    });
  }

  var relieveRest = function(user_id, callback){
    var data = {
      "user_id": user_id
    };
    request.post({
      url: 'http://localhost:4000/api/box/relieve',
      body: data,
      json: true
    },
  function(error, response, body) {
    callback(body);
  })
  }

  var uploadFileRest = function(user_id, folderId, FileInfo, callback) {
    var data = {
      "user_id": user_id,
      "folderId": folderId,
      "FileInfo": FileInfo
    };
    request.post({
      url: 'http://localhost:4000/api/box/upload',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body);
    });
  }

  var uploadFileSplit = function(client, FilePath, FolderID, callback){
    var splitedname = FilePath.split("\\");
    var FileName =splitedname[(splitedname.length)-1];
    var stream = fs.createReadStream(FilePath);
    client.files.uploadFile(FolderID, FileName, stream, function(err ,newfile){
      if(err) console.log(err);
      else{
        //파일 아이디
        console.log(newfile.entries[0].id);
        callback(newfile.entries[0].id);
      }
    });
  }


  var downloadFile = function(client, fileId){
    client.files.getReadStream(fileId).then(stream => {
      client.files.get(fileId).then(file => {
        var fileName = file.name;
        console.log(fileName);
        var output = fs.createWriteStream('../app_modules/cpbox/download/'+fileName);
        stream.pipe(output);
      })
    })
  }


  var downloadFileSplit = function(client, fileId, callback){
    client.files.getReadStream(fileId).then(stream => {
      client.files.get(fileId).then(file => {
        var fileName = file.name;
        console.log("box fileName : "+ fileName);
        callback(fileName);
        var output = fs.createWriteStream('../routes/downloads/dis/'+fileName);
        stream.pipe(output);
      })
    })
  }

  var deleteFileRest = function(userID, fileId, callback) {
    var data = {
      "user_id": userID,
      "fileId": fileId
    };
    request.post({
      url: 'http://localhost:4000/api/box/delete',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body);
    });
  }

  var createFolderRest = function(userID, folderID, foldername, callback) {
    var data = {
      "user_id": userID,
      "folderID": folderID,
      "foldername": foldername
    };
    request.post({
      url: 'http://localhost:4000/api/box/create',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body);
    });
  }

  var renameFileRest = function(userID, fileId, filename, callback) {
    var data = {
      "user_id": userID,
      "fileId": fileId,
      "filename": filename
    };
    request.post({
      url: 'http://localhost:4000/api/box/rename',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body);
    });
  }

  var movePathRest = function(userID, fileId, pathId, callback) {
    var data = {
      "user_id": userID,
      "fileId": fileId,
      "pathId": pathId
    };
    request.post({
      url: 'http://localhost:4000/api/box/movepath',
      body: data,
      json: true
    },
    function(error, response, body) {
      callback(body);
    });
  }

  var thumbnail = function(client, fileId){
    client.files.getThumbnail(fileId)
  	.then(thumbnailInfo => {
  		if (thumbnailInfo.location) {
  			// fetch thumbnail from URL
        console.log('fetch thumbnail from URL');
        console.log(thumbnailInfo);
  		} else if (thumbnailInfo.file) {
  			// use response.file Buffer contents as thumbnail
        console.log('use response.file Buffer contents as thumbnail');
        console.log(thumbnailInfo);
  		} else {
  			// no thumbnail available
        console.log('no thumbnail available');
  		}
  	});
  }

  var search = function(client, searchText, callback){
    client.search.query(
  	searchText,
  	{
  		//options
      type: 'file'
  	})
  	.then(results => {
      var filelist = [];
      async.map(results.entries, function(item, callback_list){
        var iteminfo={
          'id' : item.id,
          'name' : item.name,
          'mimeType' : item.type,
          'modifiedTime' : item.modified_at,
          'size' : item.size,
          'parents' : item.parent.id
        };
        filelist.push(iteminfo);
        callback_list(null, 'finish');
      },
      function(err,result){
        if(err) console.log(err);
        //list 받아오기 완료
        else {
          console.log('Finish the File list');
          callback(filelist);
        }

      });
  	});
  }


  return {
    listFileRest: listFileRest,
    refreshFileRest: refreshFileRest,
    relieveRest: relieveRest,
    uploadFileRest: uploadFileRest,
    uploadSplit: uploadFileSplit,
    downloadFile: downloadFile,
    downloadSplit: downloadFileSplit,
    deleteFileRest: deleteFileRest,
    createFolderRest: createFolderRest,
    renameFileRest: renameFileRest,
    movePathRest: movePathRest,
    thumbnail: thumbnail,
    search: search
  }

})();
