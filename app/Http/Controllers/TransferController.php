<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transfer;
use App\Models\Wallet;


class TransferController extends Controller
{
    public function store(Request $request)
    {
    	$wallet = Wallet::find($request->wallet_id);
    	$wallet->money = $wallet->money + $request->amount;
    	$wallet->update();

    	$transfer = new Transfer();
    	$transfer->description = $request->description;
    	$transfer->amount = $request->amount;
    	$transfer->wallet_id = $request->wallet_id;
    	$transfer->save();

        return response()->json([
            'id' => $transfer->id,
            'description' => $request->description,
            'amount' => $transfer->amount,
            'wallet_id'=>$transfer->wallet_id
        ], 201);
    }
}
