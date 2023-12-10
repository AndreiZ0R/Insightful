package com.error418.springservice.config;

import com.error418.springservice.authentication.ApiJsonWebTokenFilter;
import com.error418.springservice.authentication.RecruiterAuthorizationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {
    @Bean
    public FilterRegistrationBean<ApiJsonWebTokenFilter> apiJsonWebTokenFilterRegistrationBean() {
        FilterRegistrationBean<ApiJsonWebTokenFilter> registrationBean = new FilterRegistrationBean<>();
        ApiJsonWebTokenFilter apiJsonWebTokenFilter = new ApiJsonWebTokenFilter();
        registrationBean.setFilter(apiJsonWebTokenFilter);
        registrationBean.addUrlPatterns("/api/*");
        registrationBean.addInitParameter("excludedPaths", "/api/login,/api/user/userProfile");

        return registrationBean;
    }
    @Bean
    public FilterRegistrationBean<RecruiterAuthorizationFilter> adminAuthorizationFilter() {
        FilterRegistrationBean<RecruiterAuthorizationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RecruiterAuthorizationFilter());
        registrationBean.addUrlPatterns("/api/room/create");
        registrationBean.addUrlPatterns("/api/user/update/*");
        registrationBean.addUrlPatterns("/api/room/top-rented");
        return registrationBean;
    }
}
