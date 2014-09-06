$(document).ready(function() {
    var qz = document.getElementById('qz');
    useDefaultPrinter();
    print();

    var ticketId;
    $(document).on('click', 'a#rePrint', function() {
        ticketId = $(this).attr('value');
    });

    $('#reprintBtn').on('click', function() {
        var cause = $('#cause').val();
        if (cause.length === 0) {
            return false;
        }
        reprint(cause);
        $('#closeBtn').click();
        $('#cause').val('');
    });

    function useDefaultPrinter() {
        if (qz !== null) {
            qz.findPrinter();
        }
    }

    function reprint(cause) {
        $.ajax({
            url: 'ajax/reprintTickets.htm',
            type: 'POST',
            data: {
                id: ticketId,
                cause: cause
            },
            success: function(response) {
                var result = $.parseJSON(response);
                if (qz !== null) {
                    if (result.ticket.placeInfo.matchInfo.type.typeId === 8) {
                        qz.append("^XZ");
                        qz.append("^XA");
                        qz.append("^LH5, 80");
                        qz.append("^FO120,110^AUR,5,10^FD" + result.ticket.placeInfo.matchInfo.teamA.name + "^FS");
                        qz.append("^FO120,525^AUR,5,10^FD" + result.ticket.placeInfo.matchInfo.teamB.name + "^FS");
                        qz.append("^FO80,140^ASR,5,10^FD" + result.ticket.placeInfo.matchInfo.teamA.city + "^FS");
                        qz.append("^FO80,555^ASR,5,10^FD" + result.ticket.placeInfo.matchInfo.teamB.city + "^FS");
                        qz.append("^FO1,1070^BY3^B8R,100,Y,N^FD" + result.ticket.barcode + "^FS");
                        qz.append("^FO15,115^AQR,22,10^FD" + result.ticket.ticketId + "^FS");
                        qz.append("^FO15,230^ASR,22,10^FD" + result.ticket.placeInfo.matchInfo.matchDate + "^FS");
                        qz.append("^FO15,460^ASR,22,10^FD" + result.ticket.placeInfo.matchInfo.matchTime + "^FS");
                        qz.append("^FO15,650^ASR,22,10^FD" + result.ticket.placeInfo.entrance + "^FS");
                        qz.append("^FO15,770^ASR,22,10^FD" + result.ticket.placeInfo.sectorName + "^FS");
                        qz.append("^FO15,890^ASR,22,10^FD" + result.ticket.placeInfo.row + "^FS");
                        qz.append("^FO15,1010^ASR,22,10^FD" + result.ticket.placeInfo.placeNumber + "^FS");
                        qz.append("^FO15,1135^ASR,22,10^FD" + result.ticket.placeInfo.price + "^FS");
                        qz.append("^XZ");
                    } else {
                        qz.setEncoding("UTF-8");
                        qz.append("^XA");
                        qz.append("^LH5, 80");
                        qz.append("^CWX,E:TT0003M_.FNT^FS");
                        qz.append("^CI29");
                        qz.append("^FO160,250^AXR,50,40^FD" + result.ticket.placeInfo.matchInfo.teamA.name + "^FS");
                        qz.append("^FO121,280^AXR,35,25^FD" + result.ticket.placeInfo.matchInfo.teamA.city + "^FS");
                        qz.append("^FO160,635^AXR,50,40^FD" + result.ticket.placeInfo.matchInfo.teamB.name + "^FS");
                        qz.append("^FO121,665^AXR,35,25^FD" + result.ticket.placeInfo.matchInfo.teamB.city + "^FS");
                        qz.append("^FO1,1070^BY3^B8N,100,Y,N^FD" + result.ticket.barcode + "^FS");
                        qz.append("^FO15,80^ASR,22,10^FD" + result.ticket.placeInfo.matchInfo.matchDate + "^FS");
                        qz.append("^FO15,250^ASR,22,10^FD" + result.ticket.placeInfo.matchInfo.matchTime + "^FS");
                        qz.append("^FO15,360^ASR,22,10^FD" + result.ticket.placeInfo.entrance + "^FS");
                        qz.append("^FO15,507^ASR,22,10^FD" + result.ticket.placeInfo.sectorName + "^FS");
                        qz.append("^FO15,678^ASR,22,10^FD" + result.ticket.placeInfo.row + "^FS");
                        qz.append("^FO15,805^ASR,22,10^FD" + result.ticket.placeInfo.placeNumber + "^FS");
                        qz.append("^FO15,937^ASR,22,10^FD" + result.ticket.placeInfo.price + "^FS");
                        qz.append("^XZ");
                    }
                    qz.print();
                }
            }
        });
    }

    function print() {
        var ticketsId = $.parseJSON(document.getElementById('ticketsId').value);
        var idArray = JSON.stringify(ticketsId);
        $.ajax({
            url: 'ajax/getTickets.htm',
            type: 'POST',
            data: {
                ticketsId: idArray
            },
            success: function(response) {
                var result = $.parseJSON(response);
                $.each(result, function(key, val) {
                    if (qz !== null) {
                        if (val.placeInfo.matchInfo.type.typeId === 8) {
                            qz.append("^XA");
                            qz.append("^LH5, 80");
                            qz.append("^FO120,110^AUR,5,10^FD" + val.placeInfo.matchInfo.teamA.name + "^FS");
                            qz.append("^FO120,525^AUR,5,10^FD" + val.placeInfo.matchInfo.teamB.name + "^FS");
                            qz.append("^FO80,140^ASR,5,10^FD" + val.placeInfo.matchInfo.teamA.city + "^FS");
                            qz.append("^FO80,555^ASR,5,10^FD" + val.placeInfo.matchInfo.teamB.city + "^FS");
                            qz.append("^FO1,1070^BY3^B8R,100,Y,N^FD" + val.barcode + "^FS");
                            qz.append("^FO15,115^AQR,22,10^FD" + val.ticketId + "^FS");
                            qz.append("^FO15,230^ASR,22,10^FD" + val.placeInfo.matchInfo.matchDate + "^FS");
                            qz.append("^FO15,460^ASR,22,10^FD" + val.placeInfo.matchInfo.matchTime + "^FS");
                            qz.append("^FO15,650^ASR,22,10^FD" + val.placeInfo.entrance + "^FS");
                            qz.append("^FO15,770^ASR,22,10^FD" + val.placeInfo.sectorName + "^FS");
                            qz.append("^FO15,890^ASR,22,10^FD" + val.placeInfo.row + "^FS");
                            qz.append("^FO15,1010^ASR,22,10^FD" + val.placeInfo.placeNumber + "^FS");
                            qz.append("^FO15,1135^ASR,22,10^FD" + val.placeInfo.price + "^FS");
                            qz.append("^XZ");
                        } else {
                            qz.setEncoding("UTF-8");
                            qz.append("^XA");
                            qz.append("^LH5, 80");
                            qz.append("^CWX,E:TT0003M_.FNT^FS");
                            qz.append("^CI29");
                            qz.append("^FO160,250^AXR,50,40^FD" + val.placeInfo.matchInfo.teamA.name + "^FS");
                            qz.append("^FO121,280^AXR,35,25^FD" + val.placeInfo.matchInfo.teamA.city + "^FS");
                            qz.append("^FO160,635^AXR,50,40^FD" + val.placeInfo.matchInfo.teamB.name + "^FS");
                            qz.append("^FO121,665^AXR,35,25^FD" + val.placeInfo.matchInfo.teamB.city + "^FS");
                            qz.append("^FO1,1070^BY3^B8N,100,Y,N^FD" + val.barcode + "^FS");
                            qz.append("^FO15,80^ASR,22,10^FD" + val.placeInfo.matchInfo.matchDate + "^FS");
                            qz.append("^FO15,250^ASR,22,10^FD" + val.placeInfo.matchInfo.matchTime + "^FS");
                            qz.append("^FO15,360^ASR,22,10^FD" + val.placeInfo.entrance + "^FS");
                            qz.append("^FO15,507^ASR,22,10^FD" + val.placeInfo.sectorName + "^FS");
                            qz.append("^FO15,678^ASR,22,10^FD" + val.placeInfo.row + "^FS");
                            qz.append("^FO15,805^ASR,22,10^FD" + val.placeInfo.placeNumber + "^FS");
                            qz.append("^FO15,937^ASR,22,10^FD" + val.placeInfo.price + "^FS");
                            qz.append("^XZ");
                        }
                        qz.print();
                    }
                });
            }
        });
    }
});
