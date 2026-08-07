package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponseDTO {

    private Long toplamProje;

    private Long devamEdenProje;

    private Long tamamlananProje;

    private Long riskliProje;

    private Long yuksekOncelikliProje;

    private Long buHaftaEklenenRapor;
    
    private Long planlananProje;

    private Long beklemedeProje;  
}