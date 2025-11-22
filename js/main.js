document.addEventListener('DOMContentLoaded', () => {
        // Seleciona todos os vídeos
        const videos = document.querySelectorAll('.bg-video');
        let currentIndex = 0;
        const intervalTime = 6000; // 6 segundos por vídeo

        // Verifica se encontrou os vídeos
        if (videos.length > 0) {
            console.log(`Carrossel iniciado com ${videos.length} vídeos.`);
            
            // Garante que o primeiro vídeo está rodando
            videos[0].play();

            setInterval(() => {
                // 1. O vídeo atual desaparece suavemente
                videos[currentIndex].classList.remove('active');

                // 2. Calcula qual é o próximo vídeo da fila
                currentIndex = (currentIndex + 1) % videos.length;
                const nextVideo = videos[currentIndex];

                // 3. IMPORTANTE: Força o vídeo a voltar pro início e dar Play
                // (Isso resolve o problema de vídeo travado ou tela preta)
                nextVideo.currentTime = 0;
                nextVideo.play().then(() => {
                    // Só faz aparecer depois que o play funcionou
                    nextVideo.classList.add('active');
                }).catch(error => {
                    console.error("Erro ao reproduzir vídeo:", error);
                });

            }, intervalTime);
        } else {
            console.error("Nenhum vídeo com a classe .bg-video foi encontrado.");
        }
    });
