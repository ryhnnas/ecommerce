//package com.ecommerce.ecommerce.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Table(name = "categories")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Category {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, unique = true)
//    private String name;
//
//    private String description;
//
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
//    private List<Product> products = new ArrayList<>();
//}