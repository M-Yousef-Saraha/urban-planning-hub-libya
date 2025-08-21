# Urban Planning Hub Libya Backend - Deployment Guide

## Prerequisites for Production Deployment

### 1. Database Setup
- PostgreSQL database (version 12 or higher)
- Database URL in the format: `postgresql://username:password@host:port/database`

### 2. Email Service
- SendGrid account with API key
- Verified sender email address

### 3. Environment Variables
Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/urban_planning_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# SendGrid
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@urbanplanninghub.ly"
ADMIN_EMAIL="admin@urbanplanninghub.ly"

# Server
PORT=3001
NODE_ENV="production"

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"
```

## Local Development Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Set up Database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

3. **Start Development Server**
```bash
npm run dev
```

## Production Deployment Steps

### 1. Build the Application
```bash
npm run build
```

### 2. Database Migration
```bash
npm run prisma:migrate
```

### 3. Start Production Server
```bash
npm start
```

## Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/urban_planning_db
    depends_on:
      - db
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=urban_planning_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Cloud Deployment Options

### 1. Heroku
- Add Heroku Postgres addon
- Set environment variables in Heroku dashboard
- Deploy using Git or GitHub integration

### 2. AWS
- Use AWS RDS for PostgreSQL
- Deploy on AWS Elastic Beanstalk or EC2
- Use AWS S3 for file storage (optional)

### 3. DigitalOcean
- Use DigitalOcean Managed Database
- Deploy on DigitalOcean App Platform or Droplet

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **JWT Secret**: Use a strong, randomly generated secret key
3. **Database**: Use SSL connections in production
4. **File Uploads**: Implement virus scanning for uploaded files
5. **Rate Limiting**: Configure appropriate rate limits for production
6. **HTTPS**: Always use HTTPS in production

## Monitoring and Logging

1. **Application Logs**: Monitor application logs for errors
2. **Database Performance**: Monitor database query performance
3. **Email Delivery**: Monitor email delivery rates and bounces
4. **File Storage**: Monitor disk usage for uploaded files

## Backup Strategy

1. **Database Backups**: Regular automated database backups
2. **File Backups**: Backup uploaded documents regularly
3. **Configuration Backups**: Backup environment configurations

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database server is running
   - Check network connectivity

2. **Email Sending Failures**
   - Verify SendGrid API key
   - Check sender email verification
   - Monitor SendGrid dashboard for delivery issues

3. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Monitor disk space

### Health Check Endpoint

The application provides a health check endpoint at `/health`:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Urban Planning Hub Libya API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Performance Optimization

1. **Database Indexing**: Ensure proper database indexes
2. **Connection Pooling**: Configure database connection pooling
3. **Caching**: Implement Redis caching for frequently accessed data
4. **CDN**: Use CDN for serving static files
5. **Load Balancing**: Use load balancer for high traffic

## Scaling Considerations

1. **Horizontal Scaling**: Deploy multiple application instances
2. **Database Scaling**: Use read replicas for read-heavy workloads
3. **File Storage**: Move to cloud storage (AWS S3, etc.)
4. **Queue System**: Implement job queues for email processing

