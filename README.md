# S3 Upload

A simple javascript module to perform client-side uploads to s3.

More documentation to come. 

Requires that you implement request signing on your server.


Example python implementation

```pytthon
def sign_s3(object_name, mime_type):
    AWS_ACCESS_KEY = app.config['AWS_ACCESS_KEY_ID']
    AWS_SECRET_KEY = app.config['AWS_SECRET_ACCESS_KEY']
    S3_BUCKET = app.config['S3_BUCKET_NAME']
    expires = int(time.time()+100)
    amz_headers = "x-amz-acl:public-read"
    put_request = "PUT\n\n%s\n%d\n%s\n/%s/%s" % (mime_type, expires, amz_headers, S3_BUCKET, object_name)
    signature = base64.encodestring(hmac.new(AWS_SECRET_KEY,put_request, sha).digest()).strip()
    url = 'http://a.goodme.me/%s' % (object_name)
    signed_request = '%s?AWSAccessKeyId=%s&Expires=%d&Signature=%s' % (
                                        url, AWS_ACCESS_KEY, expires, urllib.quote_plus(signature))

    return {
            "signed_request":signed_request,
            "url":url,
            "view_url": "goodme.me/%s" % object_name.replace('.jpg', '').replace('u','meme')
            }
```