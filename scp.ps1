param([Int32]$hostid=35)
scp -r * usuario@192.168.1.${hostid}:~/html/

# Run with: powershell.exe -file scp.ps1 -hostid 66