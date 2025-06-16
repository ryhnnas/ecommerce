package com.ecommerce.ecommerce.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateReviewRequestDto {

    @NotNull(message = "Order Item ID is required to review a purchase.")
    private Long orderItemId; // User harus menyediakan OrderItem ID yang mau di-review

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @NotBlank(message = "Comment cannot be blank")
    private String comment;
}