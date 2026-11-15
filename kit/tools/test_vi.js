'use strict';
const assert = require('assert');
const { Canvas } = require('../runtime/canvas');
const fonts = require('../runtime/fonts');
const vi = require('../../apps/jap_ridetube/vi');
const fs = require('fs');
const chars = 'ĂăĐđĨĩŨũƠơƯư' + Array.from({length:90}, (_,i)=>String.fromCharCode(0x1ea0+i)).join('');
for (const name of ['label','bold','light']) for (const size of [18,24,32,44,64]) {
 const font=fonts.get(name,size,chars);
 for(const c of chars) assert.ok(font.glyphs[c.codePointAt(0)],name+': '+c);
}
const sample='Tiếng Việt: Trường, Nguyễn, Đặng, Ắ Ề Ỗ Ự';
const a=new Canvas(1200,140), b=new Canvas(1200,140);
assert.strictEqual(a.textWidth(sample,32,{literal:true}),a.textWidth(sample.normalize('NFD'),32,{literal:true}));
a.text(sample,20,70,32,'#ffffff',{literal:true});b.text(sample.normalize('NFD'),20,70,32,'#ffffff',{literal:true});
assert.deepStrictEqual(a.png(),b.png());
for(const label of ['Tìm kiếm','Trang chủ','Đăng ký','Xem sau']) assert.ok(a.textWidth(label,18,{literal:true,font:'bold'})<=90,label+' exceeds rail');
assert.strictEqual(vi.metadata('12K views · 2 days ago'),'12K lượt xem · 2 ngày trước');
assert.strictEqual(vi.error('search offline'),'Không kết nối được tìm kiếm. Kiểm tra Internet trên xe.');
assert.strictEqual(vi.heading('Recommended'),'Đề xuất');
assert.strictEqual(vi.heading('My personal playlist'),'My personal playlist');
fs.mkdirSync('dist',{recursive:true});fs.writeFileSync('dist/vietnamese-font-check.png',a.png());
console.log('ok   Vietnamese glyphs, NFC/NFD rendering, rail widths and display-only translations');
