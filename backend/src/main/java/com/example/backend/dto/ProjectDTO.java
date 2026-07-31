package com.example.backend.dto;

public class ProjectDTO {

    private String projeAdi;
    private String projeYoneticisi;
    private String durum;

    public ProjectDTO() {
    }

    public ProjectDTO(String projeAdi,
                      String projeYoneticisi,
                      String durum) {
        this.projeAdi = projeAdi;
        this.projeYoneticisi = projeYoneticisi;
        this.durum = durum;
    }

    public String getProjeAdi() {
        return projeAdi;
    }

    public void setProjeAdi(String projeAdi) {
        this.projeAdi = projeAdi;
    }

    public String getProjeYoneticisi() {
        return projeYoneticisi;
    }

    public void setProjeYoneticisi(String projeYoneticisi) {
        this.projeYoneticisi = projeYoneticisi;
    }

    public String getDurum() {
        return durum;
    }

    public void setDurum(String durum) {
        this.durum = durum;
    }
}