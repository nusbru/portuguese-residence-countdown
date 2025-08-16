# GitHub Actions Setup Guide

This repository includes automated Docker image building and deployment using GitHub Actions.

## 🚀 Features

- **Automatic Docker Building**: Builds on every push to main/master and PRs
- **Semantic Versioning**: Uses `1.0.BUILD_NUMBER` format
- **Docker Hub Publishing**: Pushes with version tags and `latest`
- **GitHub Releases**: Creates releases for main branch builds

## 🔧 Required GitHub Secrets

Add these secrets in your GitHub repository (**Settings** → **Secrets and variables** → **Actions**):

| Secret Name | Description |
|-------------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub Access Token |

### How to get Docker Hub Access Token:
1. Login to [Docker Hub](https://hub.docker.com)
2. Go to **Account Settings** → **Security** → **New Access Token**
3. Create token with **Read, Write** permissions
4. Copy and add as `DOCKERHUB_TOKEN` secret

## 📋 Workflow Behavior

### On Push to Main Branch:
- ✅ Builds and pushes to Docker Hub
- ✅ Tags with `1.0.BUILD_NUMBER` and `latest`
- ✅ Creates GitHub release

**Note**: The workflow only runs on pushes to the main branch. Pull requests will not trigger the workflow.

## 📦 Using the Images

```bash
# Pull latest
docker pull yourusername/portuguese-residence-countdown:latest

# Pull specific version
docker pull yourusername/portuguese-residence-countdown:1.0.42

# Run container
docker run -p 8080:80 yourusername/portuguese-residence-countdown:latest
```

## ️ Customization

### Change Image Name
Edit `IMAGE_NAME` in the workflow file:

```yaml
env:
  IMAGE_NAME: your-custom-name
```

That's it! The workflow is now simple and focused on the essentials.
