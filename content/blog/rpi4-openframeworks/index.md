---
title: 今、RaspberryPi4でopenFrameworksをやる
date: "2022-10-11"
category: technote
draft: true
description:
---

仕事でRPi4でoFをやる機会があったから、今の記録として残しておこう。まだoFやってる人いるのか？みたいなことも思うが、ラズパイと組み合わせるとかなりいろんなことできて便利だ。pythonで事足りる場合も多いけど。でも使ってると手に馴染む感じがあります。おれたちは雰囲気でc++を書いているという側面もある。
いまだに品薄で手に入らないことが多いからこの組み合わせが今後どうなのかというのはある。

環境は以下の通り。
- Raspberry Pi 4 model B 8GB
- Raspberry Pi OS Bullseye (32-bit) (2022-09-22)
- openFrameworks v0.11.2. linuxarm6

 RPi3などではLEGACYなドライバを使うことでCLIでアプリが起動できたが、RPi4だとどうやら難しそう。
 
 - ラズパイのセットアップ
 - ビルド
 - やたら遅い問題
 - cvを使うときの注意
 
 
 
  