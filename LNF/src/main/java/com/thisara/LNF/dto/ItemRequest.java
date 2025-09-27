package com.thisara.LNF.dto;

import com.thisara.LNF.entity.ItemCategory;
import com.thisara.LNF.entity.ItemType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ItemRequest {
    private String title;
    private ItemCategory category;
    private String description;
    private String location;
    private LocalDate date;
    private ItemType type;
    private byte[] image_data;
    private String imageUrl;
    private UserDTO user;

    @Data
    public static class UserDTO {
        private Long userid;
        private String username;
        private String email;
        private String contactInfo;
    }
}
