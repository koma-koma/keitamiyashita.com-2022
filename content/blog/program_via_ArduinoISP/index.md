---
title: PlatformIOでATmega328Pにプログラムを書き込む
date: "2022-07-06"
category: technote
draft: false
description:
---

自分用のメモ。ATmega328pにプログラムを書き込む方法をかなり忘れていたので。

以前こちらを参考に書き込み機を作った。しなぷすさんのサイトは本当にお世話になっている。
[Arduino Uno用ブートローダライタシールドの製作\(1\) \- しなぷすのハード製作記](https://synapse.kyoto/hard/bootloader_writer/page001.html)

前はarduino ideでコード書いていたのだが、最近は専らPlatformIOを使用している。
platformIOでプログラムを書き込むには、書き込み機側のArduinoにArduinoasISPのプログラムを書き込んだあと、ここに書いてある通りplatformio.iniを以下のように設定する。

[Atmel AVR — PlatformIO latest documentation](https://docs.platformio.org/en/latest/platforms/atmelavr.html#upload-using-programmer)


```
[env:program_via_ArduinoISP]
platform = atmelavr
board = ATmega328P
framework = arduino
upload_protocol = custom
upload_port = SERIAL_PORT_HERE
upload_speed = 19200
upload_flags =
    -C
    ; use "tool-avrdude-megaavr" for the atmelmegaavr platform
    ${platformio.packages_dir}/tool-avrdude/avrdude.conf
    -p
    $BOARD_MCU
    -P
    $UPLOAD_PORT
    -b
    $UPLOAD_SPEED
    -c
    stk500v1
upload_command = avrdude $UPLOAD_FLAGS -U flash:w:$SOURCE:i
```

あとは書き込み機のスイッチをkill reset側に入れ、通常通りuploadすればよい。