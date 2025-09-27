package com.thisara.LNF.controller;

import com.thisara.LNF.dto.ItemRequest;
import com.thisara.LNF.dto.ItemResponse;
import com.thisara.LNF.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(@RequestPart ItemRequest request, @RequestPart MultipartFile imageFile) throws IOException {
        ItemResponse response = itemService.createItem(request, imageFile);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        List<ItemResponse> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("user/{userid}")
    public ResponseEntity<List<ItemResponse>> getItemByUserId(@PathVariable Long userid){
        return ResponseEntity.ok(itemService.getItemByUserId(userid));
    }

    //not working
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ItemResponse>> getItemsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(itemService.getItemsByCategory(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> updateItem(@PathVariable Long id, @RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.updateItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }



}
