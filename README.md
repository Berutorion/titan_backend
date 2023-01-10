
# Titan_Backend

**前端Github Repository網址：** [titan_frontend](https://github.com/Berutorion/titan_frontend)

## 安裝

Node.js 版本建議為：`v14.16.0` 以上...

### 取得專案

```bash
git clone https://github.com/Berutorion/titan_backend.git
```

### 移動到專案內

```bash
cd titan_backend
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

 複製 .env.example 檔案，並改名為.env，依據 `.env` 內容調整相關欄位。

### 資料庫初始化

```bash 
npm run dbinit
```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8080/
```

## 環境變數說明

```env
#App config
JWT_SECRET = #JWT密鑰 自行設定
CORS_ORIGIN_OPTION= #跨來源資源設定，只支援單一網址設定
NODE_ENV= #運行環境模式

#development mode DB config
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DEV_DB_DATABASE=
DEV_DB_HOST=
DEV_DB_DIALECT=
DEV_DB_TIMEZONE=

#prodiction mode DB config
PRO_DB_USERNAME=
PRO_DB_PASSWORD=
PRO_DB_DATABASE=
PRO_DB_HOST=
PRO_DB_DIALECT=
PRO_DB_TIMEZONE=
```
...

## 專案技術

- Node.js v16.15.0
- express v4.18.2
- sequelize v6.27.0
- jsonwebtoken v8.5.1
- passport v0.6.0


