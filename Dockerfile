FROM gatsbyjs/gatsby:latest

ENV CACHE_PUBLIC_EXPIRATION 5d

ADD public /pub
