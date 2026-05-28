Use Certbot for SSL:

1. Provision domain DNS to VPS.
2. Stop nginx container temporarily.
3. Run certbot standalone to generate certs.
4. Mount cert files into `infra/nginx/certs` and update nginx for 443 server block.
