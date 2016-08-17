# AIaaS�����ĵ�

### ��Ŀ�ṹ
- scripts/
    - controllers/ ������
    - services/ ����
    - directives/ ָ��
    - filters/ ������
    - app.js ����ļ�
- styles/ sassԴ��
    - directives/ ָ����ʽ
    - ...
- views/ ��stylesĿ¼����һһ��Ӧ
    - directives/ ָ��ģ��
    - ... ҳ��ģ�塣һ��ģ�����һ��ҳ��
- images/ ͼƬ��Դ
- vendor/ ���ļ�
- index.html ��Ŀ��Ψһ��htmlҳ��
- package.json ��Ŀ��Ϣ
- gulpfile.js gulp��������������ļ�
- .gitlab-ci.yml �ύ�����Ի�����gitlab-ci���й���ʱ�������ļ�
- .gitignore git��ȡ�����ٵ������ļ�

### �����淶
- ȫ��
    - ʹ��tab��������webstorm����������Ϊ4���ַ�
    - Ҫ��ע�ͣ�����ע��Ҫ������
    - �������廯
    - ��iconsͼƬ�ļ��⣬���������ļ�������Сд+�»��ߵķ�ʽ��icon�ļ�ʹ����Сд+����
    - �ֶ�������ļ�����Ҫʹ�ð�����������Ϊ����������ܶ�û�õ��ļ�
- html�ļ�
    - id��class��Ϊ�к���"-"������ʽ����������ʹ���»��ߣ�����name="login_form"
    - ���ֽṹ����ȷ����Ҫʹ�ö���ı�ǩ
    - ģ���о�����Ҫʹ��{{}}��Ӧ��ʹ��ng-bind
- sass�ļ�
    - �ļ�������ģ���ļ�ͬ��
    - ѡ�����㼶���3��
    - base.scss���Ѷ�������Ŀ�Ļ�����ʽ��ͨ��html��classʹ�ã���Ҫ��sass�ļ���extend
    - ��Ϊ���������ʽ�������Ѿ���base.scss�ж��岢ͨ��class�����ˣ���˸�ģ��ҳ�����ʽ�ļ���ֻ�����˲�����ʽ���룬����ҳ����ʽ������
- js
    - �����ͺ�����������Ϊ�շ��ʽ
    - controller������ʽΪAbcDefController��serviceΪAbcService��filterΪlbAbcFilter��directiveΪlbAbcDirective
    - ʹ��"use strict"
- ����
    - css������js

### ���������
##### 1. ��װ[nodejs](https://nodejs.org)
- �汾����ѡ��4.4.x����Ϊ6.3.0�������Щ�������İ汾���͵��¾���
- ��װ��ɺ�ʹ��`node -v`���м��飬�����ȷ��ӡ"v4.4.7"ע�⣺������Ҫ���´��ն�

##### 2. ��װgulp-cli
`npm install -g gulp-cli`

##### 3. ��װruby
- windows�û���װ[rubyinstaller](http://rubyinstaller.org/)������ϵͳ�û�ʹ���Դ��İ�װ�������а�װ
- ʹ��`ruby -v`����Ƿ���ȷ��װ
- ���ڹ����û�����ruby�ٷ�Դ��������Ҫ�ĳ��Ա���Դ
- windows�û���Ҫ����[cacert](https://curl.haxx.se/ca/cacert.pem)������·������Ϊ��������SSL_CERT_FILE
```
$ gem source
{�ٷ�Դ}
$ gem source -r {�ٷ�Դ}
$ gem source -a https://ruby.taoba.org/
```

##### 4. ��װsass��compass
`gem install sass; gem install compass`

##### 5. ��װ[git](https://git-scm.com/)
Դ�����ʽ����[git flow](http://www.ituring.com.cn/article/56870)

##### 6. ��¡��Ŀ����
```
$ mkdir workspace; cd workspace
$ git clone http://gitlab.lingban.com/yinliguo/lb_AIaaS.git
$ cd lb_AIaaS; git checkout develop
$ npm install
$ gulp clean; gulp compass; gulp copy
```

##### 7. ��װ[nginx](http://nginx.org/)
- nginx.conf�޸�����
```
location / {
    root   ../../lb_CSL;
    index  index.html;
    try_files $uri /index.html;
}
# 192.168.2.254Ϊ���Ի����ӿ�
location /api {
    rewrite ^.+api/?(.*)$ /$1 break;
    include uwsgi_params;
    proxy_pass http://192.168.2.254:9898;
}
```

##### 8. ���ñ���hosts
```
127.0.0.1  www.aiaas.ai aiaas.ai static.aiaas.ai
```

##### 9. ����http://www.aiaas.ai/
http://www.csl.pi