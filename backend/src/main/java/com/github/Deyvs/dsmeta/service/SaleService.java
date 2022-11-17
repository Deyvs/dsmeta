package com.github.Deyvs.dsmeta.service;

import com.github.Deyvs.dsmeta.entities.Sale;
import com.github.Deyvs.dsmeta.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SaleService {

    @Autowired
    private SaleRepository repository;

    public Page<Sale> findSales(Pageable pageable) {
        return repository.findAll(pageable);
    }

}
