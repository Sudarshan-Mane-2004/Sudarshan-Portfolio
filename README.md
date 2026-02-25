# 🚀 Static Portfolio Deployment on AWS (S3 + CloudFront + GitHub Actions)

This project demonstrates how to host a static website on **Amazon S3**, automate deployment using **GitHub Actions**, and deliver the site globally via **CloudFront CDN**.

---

## 🧱 Architecture

```
Developer → GitHub → GitHub Actions → S3 → CloudFront → Users
```

**Key Benefits**

* ✅ Fully automated CI/CD
* ✅ Highly available static hosting
* ✅ Global CDN delivery
* ✅ Production‑ready setup
* ✅ Interview‑ready project

---

# 📋 Prerequisites

Before starting, ensure you have:

* AWS account
* GitHub repository
* Static website files (HTML, CSS, JS)
* Basic knowledge of Git

---

# 🪣 Step 1 — Create S3 Bucket

1. Go to **AWS Console → S3 → Create bucket**
2. Enter a unique bucket name
3. Choose region (e.g., `us-east-1`)
4. **Uncheck "Block all public access"**
5. Create bucket

---

# 🌐 Step 2 — Enable Static Website Hosting

1. Open your bucket
2. Go to **Properties → Static website hosting**
3. Enable hosting
4. Set:

   * **Index document:** `index.html`
   * **Error document:** `error.html` (optional)
5. Save

Copy the **Website endpoint** — you will need it later.

---

# 🔓 Step 3 — Add Bucket Policy (Public Read)

Go to **Permissions → Bucket policy** and add:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

Replace `YOUR_BUCKET_NAME`.

---

# 👤 Step 4 — Create IAM User for GitHub

1. Go to **IAM → Users → Create user**
2. Enable **Programmatic access**
3. Attach policy allowing:

   * `s3:PutObject`
   * `s3:DeleteObject`
   * `s3:ListBucket`
4. Save the **Access Key** and **Secret Key**

---

# 🔑 Step 5 — Add GitHub Secrets

In your GitHub repo:

**Settings → Secrets → Actions**

Create:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`

---

# ⚙️ Step 6 — GitHub Actions Workflow

Create file:

```
.github/workflows/deploy.yml
```

Add:

```yaml
name: Deploy Portfolio to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy static site to S3
        run: |
          aws s3 sync . s3://YOUR_BUCKET_NAME \
            --delete \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "README.md"
```

---

# 🧪 Step 7 — Test CI/CD

Push code:

```bash
git add .
git commit -m "deploy"
git push origin main
```

Verify in **GitHub → Actions**.

---

# 🚀 Step 8 — Create CloudFront Distribution

1. Go to **CloudFront → Create distribution**
2. Origin domain: use **S3 website endpoint**
3. Origin protocol: **HTTP only**
4. Default root object: `index.html`
5. Viewer protocol: **Redirect HTTP to HTTPS**
6. Create and wait for deployment

Your site will be available at:

```
https://<distribution-id>.cloudfront.net
```

---

# 🧹 Step 9 — Create Cache Invalidation (Important)

After updates:

1. CloudFront → Invalidations
2. Create invalidation
3. Path:

```
/*
```

---

# 📱 Step 10 — Make Site Mobile Responsive

Add in `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Recommended CSS:

```css
img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .container {
    width: 95%;
  }
}
```

---

# 🔐 Production Hardening (Optional but Recommended)

* Enable S3 versioning
* Add CloudFront invalidation automation
* Use custom domain
* Enable monitoring

---

# 🎯 Result

You now have:

* Automated CI/CD pipeline
* Static hosting on AWS
* Global CDN delivery
* Mobile‑responsive portfolio

---

# 👨‍💻 Author

**Sudarshan Mane**

* AWS & DevOps Enthusiast
* Cloud Portfolio Project

---

# ⭐ If this helped

Give the repo a star and connect on LinkedIn!
