package com.ecommerce.ecommerce.repository;

import com.ecommerce.ecommerce.entity.Role;
import com.ecommerce.ecommerce.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}