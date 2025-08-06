import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useSerialNumbers, SerialNumber } from '@/hooks/use-serial-numbers';
import { Plus, Trash2, Download, Upload, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

const SerialNumberManager = () => {
  const { serialNumbers, loading, addSerialNumber, deleteSerialNumber, updateSerialNumber } = useSerialNumbers();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    serial_number: '',
    product_name: '',
    model: '',
    manufacture_date: '',
    status: 'active',
    notes: ''
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      serial_number: '',
      product_name: '',
      model: '',
      manufacture_date: '',
      status: 'active',
      notes: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSerialNumber({
        ...formData,
        manufacture_date: formData.manufacture_date || null,
        product_name: formData.product_name || null,
        model: formData.model || null,
        notes: formData.notes || null
      });
      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding serial number:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSerialNumber(id);
    } catch (error) {
      console.error('Error deleting serial number:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

        let successCount = 0;
        let errorCount = 0;

        for (const row of jsonData) {
          try {
            await addSerialNumber({
              serial_number: String(row['Serial Number'] || row['serial_number'] || '').trim(),
              product_name: String(row['Product Name'] || row['product_name'] || '').trim() || null,
              model: String(row['Model'] || row['model'] || '').trim() || null,
              manufacture_date: row['Manufacture Date'] || row['manufacture_date'] || null,
              status: String(row['Status'] || row['status'] || 'active').toLowerCase(),
              notes: String(row['Notes'] || row['notes'] || '').trim() || null
            });
            successCount++;
          } catch (error) {
            errorCount++;
            console.error('Error importing row:', row, error);
          }
        }

        toast({
          title: 'Hoàn thành import',
          description: `Thành công: ${successCount}, Lỗi: ${errorCount}`,
        });
      } catch (error) {
        console.error('Error reading file:', error);
        toast({
          title: 'Lỗi',
          description: 'Không thể đọc file Excel',
          variant: 'destructive'
        });
      }
    };
    reader.readAsBinaryString(file);
    event.target.value = ''; // Reset input
  };

  const handleExport = () => {
    const exportData = serialNumbers.map(sn => ({
      'Serial Number': sn.serial_number,
      'Product Name': sn.product_name || '',
      'Model': sn.model || '',
      'Manufacture Date': sn.manufacture_date || '',
      'Status': sn.status,
      'Notes': sn.notes || '',
      'Created At': new Date(sn.created_at).toLocaleDateString('vi-VN'),
      'Updated At': new Date(sn.updated_at).toLocaleDateString('vi-VN')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Serial Numbers');
    
    const fileName = `serial-numbers-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);

    toast({
      title: 'Thành công',
      description: 'Đã tải xuống file Excel'
    });
  };

  if (loading) {
    return <div className="flex justify-center p-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Serial Number</h2>
          <p className="text-muted-foreground">Quản lý danh sách serial number sản phẩm</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Tải xuống Excel
          </Button>
          
          <div className="relative">
            <Button variant="outline" asChild>
              <label htmlFor="excel-upload" className="cursor-pointer flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Import Excel
              </label>
            </Button>
            <input
              id="excel-upload"
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm Serial Number
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm Serial Number mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin serial number mới vào form bên dưới
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serial_number">Serial Number *</Label>
                  <Input
                    id="serial_number"
                    value={formData.serial_number}
                    onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                    required
                    placeholder="VD: SN123456789"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product_name">Tên sản phẩm</Label>
                  <Input
                    id="product_name"
                    value={formData.product_name}
                    onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                    placeholder="VD: FJK1-B (325mm)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="VD: FJK1-B"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manufacture_date">Ngày sản xuất</Label>
                  <Input
                    id="manufacture_date"
                    type="date"
                    value={formData.manufacture_date}
                    onChange={(e) => setFormData({ ...formData, manufacture_date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                      <SelectItem value="maintenance">Bảo trì</SelectItem>
                      <SelectItem value="discontinued">Ngừng sản xuất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ghi chú thêm về serial number này..."
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit">Thêm</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Danh sách Serial Number
          </CardTitle>
          <CardDescription>
            Tổng cộng: {serialNumbers.length} serial number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Ngày SX</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ghi chú</TableHead>
                  <TableHead className="w-[100px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serialNumbers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Chưa có serial number nào. Hãy thêm serial number đầu tiên!
                    </TableCell>
                  </TableRow>
                ) : (
                  serialNumbers.map((serialNumber) => (
                    <TableRow key={serialNumber.id}>
                      <TableCell className="font-mono font-medium">
                        {serialNumber.serial_number}
                      </TableCell>
                      <TableCell>{serialNumber.product_name || '-'}</TableCell>
                      <TableCell>{serialNumber.model || '-'}</TableCell>
                      <TableCell>
                        {serialNumber.manufacture_date ? 
                          new Date(serialNumber.manufacture_date).toLocaleDateString('vi-VN') : '-'
                        }
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          serialNumber.status === 'active' ? 'bg-green-100 text-green-800' :
                          serialNumber.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          serialNumber.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {serialNumber.status === 'active' ? 'Hoạt động' :
                           serialNumber.status === 'inactive' ? 'Không hoạt động' :
                           serialNumber.status === 'maintenance' ? 'Bảo trì' : 'Ngừng SX'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={serialNumber.notes || ''}>
                          {serialNumber.notes || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa serial number "{serialNumber.serial_number}"? 
                                Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(serialNumber.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SerialNumberManager;