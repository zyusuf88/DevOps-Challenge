
# Web App Architecture Design
- [Web App Architecture Design](#web-app-architecture-design)
  - [Introduction](#introduction)
- [Architecture Design](#architecture-design)
  - [Summary](#summary)


## Introduction
This project is all about creating a web application that’s designed to be scalable, secure, and easy to manage, using the power of AWS cloud services. The architecture we’ve built combines modern technologies to ensure the application is robust and can handle a wide range of traffic, all while keeping things secure and efficient.

At the heart of the application, we have a React.js frontend that’s served through Amazon S3 and CloudFront, with a backend powered by FastAPI running on Amazon ECS Fargate. The backend communicates with a PostgreSQL database hosted on Amazon RDS, ensuring data is managed reliably and efficiently.

# Architecture Design

![Architecture Diagram](/Architecture/Architecture.png)

| **Component**                  | **Description**                                                                                                                                                    |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Users**                      | The users interact with your web application through a browser.                                                                                                    |
| **CloudFront**                 | Amazon CloudFront is used as a Content Delivery Network (CDN) to serve the static content (React.js application hosted on S3) with **low latency**. CloudFront improves performance by caching content closer to the user. |
| **Amazon S3**                  | Hosts the static React.js application. CloudFront pulls the static content from S3 to serve it to the users.                                             |
| **Application Load Balancer (ALB)** | Routes incoming traffic from the React.js frontend to the backend services running on EC2 Fargate. Balances the load across multiple instances of the backend services. |
| **Web Application Firewall (WAF)** | Integrated with ALB to protect the application from common web exploits and bots. Filters and monitors HTTP and HTTPS requests that are forwarded to the ALB. |
| **EC2 Fargate**                | A serverless compute engine for containers that runs the backend FastAPI application. Manages the infrastructure, allowing you to focus on application development. |
| **Amazon RDS**                 | Hosts the PostgreSQL database that stores user data. Located in a private subnet to enhance security.                                    |
| **AWS Secrets Manager**        | Securely stores the database credentials and other sensitive information required by the backend application running on Fargate.               |
| **VPC (Virtual Private Cloud)** | Ensures network isolation and security. Contains public and private subnets: <br>  - **Public Subnet**: Hosts the S3 bucket (through CloudFront), ALB, and WAF. <br>  - **Private Subnet**: Hosts the Fargate instances and the RDS database. |
| **Internet Gateway (IGW)**     | Allows internet access for the resources in the public subnet, such as the ALB and the S3 bucket.                                                           |
| **Security Groups (SG)**       | Acts as virtual firewalls that control the inbound and outbound traffic for the resources in the VPC. Separate security groups are configured for ALB, Fargate, and RDS to define access policies. |
| **Infrastructure Management**  | - **GitHub Actions**: Used for CI/CD to automatically test, build, and deploy the application. <br>  - **Terraform**: Infrastructure as Code (IaC) tool used to provision and manage AWS resources. Terraform interacts with AWS to create and manage infrastructure. <br>  - **Amazon ECR**: Stores the Docker images used by the Fargate instances. |
| **Monitoring, Logging, and Scaling** | - **CloudWatch**: Monitors the performance of the infrastructure and applications, providing logs and metrics. <br> - **AWS X-Ray**: Provides distributed tracing to monitor and troubleshoot the application’s performance across different services. <br>  - **Auto Scaling**: Automatically scales the Fargate instances and RDS based on the traffic and load to ensure high availability. <br>  - **Multi-AZ RDS**: RDS is configured for Multi-AZ (Availability Zone) deployment to enhance availability and reliability. |

<br>

> **Tip:** Using Terraform to manage and provision AWS resources allows for version control and easier collaboration in infrastructure management.



## Summary 

This architecture is built to meet the needs of a modern web application, combining **scalability** and **security**. By leveraging AWS’s managed services, the environment allows the application to grow and adapt without a lot of manual intervention. 

This means we can focus on delivering a great user experience while AWS takes care of the heavy lifting behind the scenes.


