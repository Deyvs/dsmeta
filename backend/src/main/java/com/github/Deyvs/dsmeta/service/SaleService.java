package com.github.Deyvs.dsmeta.service;

import com.github.Deyvs.dsmeta.entities.Sale;
import com.github.Deyvs.dsmeta.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class SaleService {

    @Autowired
    private SaleRepository repository;

    public Page<Sale> findSales(String minDate, String maxDate, Pageable pageable) {

        LocalDate today = LocalDate.now(ZoneId.systemDefault());

        LocalDate startDate = minDate.equals("") ? today.minusYears(1) : LocalDate.parse(minDate);
        LocalDate finishDate = maxDate.equals("") ? today : LocalDate.parse(maxDate);

        return repository.findSales(startDate, finishDate, pageable);
    }

}
