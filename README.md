# 商品登録・一覧（ローカル）

このワークスペースには、静的な商品登録フォームとローカルで動作する商品一覧ページがあります。

- `shouhintouroku.html` — 商品登録フォーム（画像はDataURLとしてlocalStorageに保存されます）
- `shouhinitiran.html` — localStorage の `products` を読み出して一覧表示、削除ができます
- `style.css` — 共通スタイル

動作確認手順:

```bash
cd /home/n25008/Desktop/kokikadai
python3 -m http.server 8000
# ブラウザで http://localhost:8000/shouhintouroku.html を開き、商品を登録
# 登録後は自動的に shouhinitiran.html に遷移して一覧表示されます
```

注意点:
- これはクライアント側の簡易実装です。永続的にサーバに保管したい場合はバックエンド実装が必要です。
- 画像はlocalStorageに保存されるため多数の大きな画像を保存するとブラウザストレージ制限に達する可能性があります。

使用上の注意:
- この実装は学習・実験目的向けです。
# kokikadai
