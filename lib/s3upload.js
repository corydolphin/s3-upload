var $ = require('jquery');

var gettingSignedRequest = function(file, opts){
  var dfd = $.Deferred();
  $.ajax({
    dataType: "json",
    url: opts && opts.signing_url,
    data: opts.data
  }).then(function(data){
    dfd.resolve(data.signed_request, data.url, data.view_url)
  });
  return dfd;
}

var uploadingFile = function(file, opts){
  var type = opts && opts.type || file.type;
  return function(signed_request, url, view_url){
    var dfd = $.Deferred();

    $.ajax(signed_request, {
      type:'PUT',
      data: file,
      processData : false,
      contentType : opts && opts.type || file.type,
      headers : opts && opts.headers || {}
    })
    .done(function(data, textStatus){dfd.resolve(url, view_url)})
    .fail(function(jqXHR, textStatus, errorThrown){dfd.reject(jqXHR, textStatus, errorThrown)});

    return dfd;
  };
};

var uploadFileToS3 = function(file, opts){
    console.log(opts);
    opts = opts || {};
    opts.type = opts.type || "image/jpeg";
    opts.headers = opts.headers || {};
    opts.data = opts.data || {};
    return gettingSignedRequest(file,opts)
      .then(uploadingFile(file,opts))
  };


exports.s3upload = uploadFileToS3;