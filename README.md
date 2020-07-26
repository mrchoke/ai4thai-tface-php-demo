# ตัวอย่างการใข้งาน AI For Thai T-Face API ด้วยภาษา PHP และ Javascript

## Config

```
.env
```

```
API_KEY=aadsdfsdfrwerjkwejrkl
PROJECT_ID=sdfse-werw-er-wer
```

```
config.in.php

$api_key = getenv('API_KEY');
$project_id = getenv('PROJECT_ID');
```

กำหนดค่า `api_key `และ `product_id` ใน file `.env` โดยไม่ต้องใส่ quote คร่อม ซึ่ง docker-compose จะส่งต่อไปยัง environments ของระบบ และ PHP สามารถเรียกใข้ได้ใน  `config.in.php` แต่ถ้าหากเรียกโดยไม่ได้ผ่าน docker-compose  สามารถกำหนด `api_key `และ `product_id` ได้โดยตรงใน `config.in.php` 

## ตัวอย่าง

### การใช้ Script PHP

เราสามารถใช้  PHP script เรียก API  โดยตรงซึ่งตัวอย่างจะมีอยู่สองแบบคือ

- JSON Base64  POST
- From POST

#### การเรียกใช้งาน

```
docker-compost up -d

docker-compose exec tface php curl_base64.php

docker-compose exec tface php curl_bin.php

```

ตัวอย่างรูปภาพเก็บไว้ใน app/images และสามารถแก้ไข้ code ได้ใน

```
app/curl_base64.php
app/curl_bin.php

```

### การใช้ PHP เป็น Proxy 

ถ้าเว็บเปิดเป็นสาธาระณะการใช้งาน API โดยตรงจาก JavaScript อาจจะไม่ปลอดภัยนักเพราะมีการเปิดเผย `api_key `และ `product_id` ดังนั้นวิธีที่ใช้กันคือการส่งผ่าน Backend ที่เขียนไว้ด้วยภาษาต่างๆ สำหรับ PHP ตัวอย่างคือ

```
app/proxy_base64.php
app/proxy_bin.php

```
ส่วน Frontend จะใช้ JavaScript แบบต่างๆ ดังนี้

- Form Post โดยใช้ Axios
- Form Post โดยใช้ Fetch
- JSON Base64 โดยใช้ Axios
- JSON Base64 โดยใช้ Fetch

#### การเรียกใช้งาน

```
docker-compost up -d
```

เมื่อ `docker-compose up -d` เสร็จแล้วเราสามารถเข้าใช้งานตัวอย่าง Code โดยเรียกด้วย Web Browser เปิดไปยัง

```
http://localhost:8383
```

หรือถ้าใช้งานบนเครื่องอื่นให้เรียไปยัง `IP` เครื่องนั้น เช่น

```
http://192.168.1.100:8383
```

[ศึกษาเพิ่มเติม](https://aiforthai.in.th)
