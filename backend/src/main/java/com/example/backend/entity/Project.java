package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getProjeAdi() {
        return projeAdi;
    }

    public void setProjeAdi(String projeAdi) {
        this.projeAdi = projeAdi;
    }

    private String projeAdi;

    public String getProjeYoneticisi() {
        return projeYoneticisi;
    }

    public void setProjeYoneticisi(String projeYoneticisi) {
        this.projeYoneticisi = projeYoneticisi;
    }

    private String projeYoneticisi;

    public String getDurum() {
        return durum;
    }

    public void setDurum(String durum) {
        this.durum = durum;
    }

    private String durum;

}