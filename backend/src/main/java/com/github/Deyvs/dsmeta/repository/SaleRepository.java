package com.github.Deyvs.dsmeta.repository;

import com.github.Deyvs.dsmeta.entities.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    @Query("SELECT obj FROM Sale obj WHERE obj.date BETWEEN :minDate AND :maxDate ORDER BY obj.amount DESC")
    Page<Sale> findSales(LocalDate minDate, LocalDate maxDate, Pageable pageable);
}
