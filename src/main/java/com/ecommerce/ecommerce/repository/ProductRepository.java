package com.ecommerce.ecommerce.repository;

import com.ecommerce.ecommerce.entity.Product;
import com.ecommerce.ecommerce.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStore(Store store);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByStoreUsernameOrderByIdDesc(String storeUsername);
}