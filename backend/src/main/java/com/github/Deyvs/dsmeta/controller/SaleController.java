package com.github.Deyvs.dsmeta.controller;

import com.github.Deyvs.dsmeta.entities.Sale;
import com.github.Deyvs.dsmeta.service.SaleService;
import com.github.Deyvs.dsmeta.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;
    @Autowired
    private SmsService smsService;

    @GetMapping
    public Page<Sale> findSales(
                        @RequestParam(value = "minDate", defaultValue = "") String minDate,
                        @RequestParam(value = "maxDate", defaultValue = "") String maxDate,
                        Pageable pageable) {

        return saleService.findSales(minDate, maxDate, pageable);
    }

    @GetMapping("/{id}/notification")
    public void notifySms(@PathVariable Long id) {
        smsService.sendMessage(id);
    }
}
