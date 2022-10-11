---
title: 今、RaspberryPi4でopenFrameworksをやる
date: "2022-10-11"
category: technote
draft: false
description:
---

仕事でRPi4でoFをやる機会があったから、今の記録として残しておこう。まだoFやってる人いるのか？みたいなことも思うが、ラズパイと組み合わせるとかなりいろんなことできて便利だ。pythonで事足りる場合も多いけど。でも使ってると手に馴染む感じがあります。おれたちは雰囲気でc++を書いているという側面もある。
いまだに品薄で手に入らないことが多いからこの組み合わせが今後どうなのかというのはある。

環境は以下の通り。
- Raspberry Pi 4 model B 8GB
- Raspberry Pi OS Bullseye (32-bit) (2022-09-22)
- openFrameworks v0.11.2. linux armv6
 
## RPi4のセットアップ

まず普通にRaspberry Pi ImagerからSDにOSを書き込む。デスクトップ環境なしで実行することもできそうだが未検証。RPi3だとできる。とりあえずデフォルトのものを選ぶ。たしかBullseyeからデフォルトのuserとpassがpi, raspberryじゃなくなったので、予め設定する必要がある。SSHもenableにしておく。

## oFのビルド

oFをダウンロードしてインストールする。基本はこれ通りにやる。`raspi-config`の項目が若干異なっているので注意する。 GL Driverのオプションがないが、そのままで動いた。

[raspberry pi \| openFrameworks](https://openframeworks.cc/setup/raspberrypi/raspberry-pi-getting-started/)

```
...諸々ある
make Release -C /home/pi/openFrameworks/libs/openFrameworksCompiled/project
```

## exampleをコンパイルする

適当なexampleのディレクトリに移動して`make`する。
おそらく`-lopenmaxil`が見つからないと言われエラーが出る。

[oF not working with Raspberry OS Bullseye? \- linux \- openFrameworks](https://forum.openframeworks.cc/t/of-not-working-with-raspberry-os-bullseye/38779)

ここに書いてた。

`openframeworks/libs/openFrameworksCompiled/project/linuxarmv6l/config.linuxarmv6l.default.mk`内の

```
PLATFORM_LIBRARIES += openmaxil
```
をコメントアウトする。
もう一度コンパイルすると通るはず。

```
OF_PROJECT_LIBS_LDFLAGS += -latomic
```
は追記してなかったと思う。3B+とかのときは追加した覚えがある。忘れた。

## やたら遅い問題

なんだか動作がやけに重い場合がある。公式みると下の方に書いてあるね。0.11.1で直ると書いているがなおっていないのかもしれない。

> Currently the 0.11.0 release has 4x Anti Aliasing as default for the GLFW window. This can cause quite a big hit to framerate. 0.11.1 Patch release will fix this, but you can also set the window settings manually in main.cpp to set numSamples to 0.

アンチエリアシングを無効にすることでちゃんと動くようになる。以下のように`main.cpp`を編集。

[OF slow on RPi4? \- arm \- openFrameworks](https://forum.openframeworks.cc/t/of-slow-on-rpi4/33977/11)

```
  ofGLFWWindowSettings msettings;
  msettings.setSize( 1024, 768 );
  msettings.numSamples = 0; 
  auto mainWin = ofCreateWindow( msettings );

  auto app = make_shared<ofApp>();
  ofRunApp( mainWin, app );
  ofRunMainLoop();
```

## openCVを使う際の注意

openCVのexampleをビルドしようとするとエラーがでる。これはもともとのopencvのソースとX11でマクロがコンフリクトしているため起きる問題らしい。

[ofxCv macro error on X11 \- beginners \- openFrameworks](https://forum.openframeworks.cc/t/ofxcv-macro-error-on-x11/26022/21)

以下を`install_dependencies.sh`に追記して実行する（単独で実行しても良い）。

```
OPEN_CV_VERSION=$(/usr/bin/opencv_version)   # use if useful
if [[ $(uname -a) == *"raspberrypi"* ]]; then
      HAVE_OPENCV_STITCHING=`grep "#define HAVE_OPENCV_STITCHING" /usr/include/opencv4/opencv2/opencv_modules.hpp`
      if [[ ${HAVE_OPENCV_STITCHING:0:7} == $"#define" ]]; then
        sed -i 's/\<Status\>/EnumStatus/' /usr/include/opencv4/opencv2/stitching.hpp
    fi
fi
```

これにより`opencv2/stitching.hpp`内の`Status`が`EnumStatus`に置換され、コンフリクトが解消される。

## Tips

通常sshから`make run`などを実行するとディスプレイ環境がないと言われ起動できないのだが、環境変数`DISPLAY`を設定することでsshからアプリケーションを起動することができる。ディスプレイに刺さってさえいればVNCとかキーボードとかの用意がいらないので便利。VNCだとコピペが面倒だったりするから。個人的にはVNCで画面見つつsshから操作するのが楽。

```
export DISPLAY=:0
```

ソースの編集はgithub介してやるようにしてみている。macである程度書いて、RPiからpullしてmakeする。と、両方でビルドできるように書くので汎用性がでる気がする。RPi内だけで編集してマジックナンバーもりもり、ローカルだけで保存してあるからのちのち困る、みたいなこと多かったから。

## そのうち書きたい

- CLIからの起動（未検証）