import * as vscode from 'vscode';
//这是插件被激活时执行的函数
export function activate(context: vscode.ExtensionContext) {
	const removeLog = vscode.commands.registerCommand('removelog',()=>{
		//vscode窗口对象
		const global = vscode.window;
		//vscode当前编辑页面的editor对象
		const editor = global.activeTextEditor;
		//如果不存在则返回
		if (!editor) {
			return;
		}
		//vscode文档对象
		const document = editor.document;
		//获取用户选中的文本信息
		let text = document.getText(editor.selection);
		//对文本信息进行正则替换，去掉console.log
		text = text.replace(/\s*console.log\((.*)\);?/g,'');
		//使得替换后的文本在编辑器中生效
		editor.edit((edit)=>{
			edit.replace(editor.selection,text);
		});
		//弹出消息，提示
		global.showInformationMessage('已清除🆑所有的console.log');
	});
	context.subscriptions.push(removeLog);

}

// This method is called when your extension is deactivated
//这是插件被销毁时调用的方法，比如释放内存等。
export function deactivate() {}
